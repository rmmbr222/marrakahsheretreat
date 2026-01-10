// Booking Calendar
class BookingCalendar {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.currentDate = new Date();
        this.selectedStartDate = null;
        this.selectedEndDate = null;
        this.bookedDates = options.bookedDates || [];
        this.minStay = options.minStay || 2;
        this.onDateSelect = options.onDateSelect || function() {};

        this.init();
    }

    init() {
        this.render();
    }

    render() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        let html = `
            <div class="calendar">
                <div class="calendar-header">
                    <div class="calendar-month">${monthNames[month]} ${year}</div>
                    <div class="calendar-nav">
                        <button id="prev-month">&#10094;</button>
                        <button id="next-month">&#10095;</button>
                    </div>
                </div>
                <div class="calendar-grid">
        `;

        // Day headers
        dayNames.forEach(day => {
            html += `<div class="calendar-day-header">${day}</div>`;
        });

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            html += `<div class="calendar-day other-month">${day}</div>`;
        }

        // Current month days
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDay = new Date(year, month, day);
            currentDay.setHours(0, 0, 0, 0);

            let classes = 'calendar-day';
            let disabled = false;

            // Disable past dates
            if (currentDay < today) {
                classes += ' other-month';
                disabled = true;
            }

            // Check if date is booked
            const isBooked = this.isDateBooked(currentDay);
            if (isBooked) {
                classes += ' booked';
                disabled = true;
            }

            // Check if date is selected
            if (this.selectedStartDate && currentDay.getTime() === this.selectedStartDate.getTime()) {
                classes += ' selected';
            } else if (this.selectedEndDate && currentDay.getTime() === this.selectedEndDate.getTime()) {
                classes += ' selected';
            } else if (this.isDateInRange(currentDay)) {
                classes += ' in-range';
            }

            // Format date in local timezone for data attribute
            const dataYear = currentDay.getFullYear();
            const dataMonth = String(currentDay.getMonth() + 1).padStart(2, '0');
            const dataDay = String(currentDay.getDate()).padStart(2, '0');
            const dataDate = `${dataYear}-${dataMonth}-${dataDay}`;
            html += `<div class="calendar-day ${classes}" data-date="${dataDate}" ${disabled ? '' : 'data-selectable="true"'}>${day}</div>`;
        }

        // Next month days
        const totalCells = firstDay + daysInMonth;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let day = 1; day <= remainingCells; day++) {
            html += `<div class="calendar-day other-month">${day}</div>`;
        }

        html += `
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Month navigation
        const prevButton = document.getElementById('prev-month');
        const nextButton = document.getElementById('next-month');

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.render();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.render();
            });
        }

        // Day selection
        const selectableDays = this.container.querySelectorAll('.calendar-day[data-selectable="true"]');
        selectableDays.forEach(day => {
            day.addEventListener('click', () => {
                const dateStr = day.getAttribute('data-date');
                // Parse date in local timezone to avoid timezone shifts
                const [year, month, dayNum] = dateStr.split('-').map(Number);
                const selectedDate = new Date(year, month - 1, dayNum);
                this.selectDate(selectedDate);
            });
        });
    }

    selectDate(date) {
        if (!this.selectedStartDate || (this.selectedStartDate && this.selectedEndDate)) {
            // Starting new selection
            this.selectedStartDate = date;
            this.selectedEndDate = null;
        } else if (date > this.selectedStartDate) {
            // Selecting end date
            this.selectedEndDate = date;

            // Check if range is valid (no booked dates in between)
            if (!this.isRangeValid(this.selectedStartDate, this.selectedEndDate)) {
                alert('Selected range contains booked dates. Please choose different dates.');
                this.selectedStartDate = date;
                this.selectedEndDate = null;
            }
        } else {
            // Date is before start date, reset
            this.selectedStartDate = date;
            this.selectedEndDate = null;
        }

        this.render();
        this.onDateSelect(this.selectedStartDate, this.selectedEndDate);
    }

    isDateBooked(date) {
        // Create date string in YYYY-MM-DD format without timezone issues
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        return this.bookedDates.includes(dateStr);
    }

    isDateInRange(date) {
        if (!this.selectedStartDate || !this.selectedEndDate) return false;
        return date > this.selectedStartDate && date < this.selectedEndDate;
    }

    isRangeValid(startDate, endDate) {
        const current = new Date(startDate);
        while (current < endDate) {
            current.setDate(current.getDate() + 1);
            if (this.isDateBooked(current) && current < endDate) {
                return false;
            }
        }
        return true;
    }

    getSelectedDates() {
        return {
            checkIn: this.selectedStartDate,
            checkOut: this.selectedEndDate
        };
    }

    getNights() {
        if (!this.selectedStartDate || !this.selectedEndDate) return 0;
        const diffTime = Math.abs(this.selectedEndDate - this.selectedStartDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
}

// Fetch blocked dates from Airbnb iCal sync
async function fetchBlockedDates() {
    try {
        // Try to fetch from your serverless function
        const response = await fetch('/.netlify/functions/get-blocked-dates');
        const data = await response.json();

        if (data.bookedDates && Array.isArray(data.bookedDates)) {
            console.log(`✓ Calendar synced with Airbnb: ${data.bookedDates.length} blocked dates`);
            return data.bookedDates;
        } else {
            console.warn('No booked dates returned from API, using fallback');
            return getFallbackBlockedDates();
        }
    } catch (error) {
        console.warn('Could not fetch blocked dates from API, using fallback:', error.message);
        return getFallbackBlockedDates();
    }
}

// Fallback blocked dates if API is not available
function getFallbackBlockedDates() {
    return [
        '2024-12-25',
        '2024-12-26',
        '2024-12-27',
        '2024-12-28',
        '2025-01-01',
        '2025-01-02',
        '2025-01-03'
    ];
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Fetch blocked dates from Airbnb or use fallback
    const bookedDates = await fetchBlockedDates();

    window.bookingCalendar = new BookingCalendar('calendar', {
        bookedDates: bookedDates,
        minStay: 2,
        onDateSelect: function(startDate, endDate) {
            // Update form fields
            const checkInInput = document.getElementById('check-in');
            const checkOutInput = document.getElementById('check-out');

            if (startDate) {
                // Format date in local timezone to avoid UTC shift
                const year = startDate.getFullYear();
                const month = String(startDate.getMonth() + 1).padStart(2, '0');
                const day = String(startDate.getDate()).padStart(2, '0');
                checkInInput.value = `${year}-${month}-${day}`;
            }

            if (endDate) {
                // Format date in local timezone to avoid UTC shift
                const year = endDate.getFullYear();
                const month = String(endDate.getMonth() + 1).padStart(2, '0');
                const day = String(endDate.getDate()).padStart(2, '0');
                checkOutInput.value = `${year}-${month}-${day}`;
            }

            // Trigger price calculation
            if (window.calculatePrice) {
                window.calculatePrice();
            }
        }
    });
});
