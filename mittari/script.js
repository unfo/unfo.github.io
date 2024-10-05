document.addEventListener('DOMContentLoaded', () => {
  const hourOptions = document.getElementById('hour-options');
  const minuteOptions = document.getElementById('minute-options');

  // Populate hour buttons (00-23)
  for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0');
      hourOptions.innerHTML += `
          <input type="radio" id="hour-${i}" name="hour" value="${i}">
          <label for="hour-${i}">${hour}</label>
      `;
  }

  // Populate minute buttons (00, 05, 10, ..., 55)
  for (let i = 0; i < 60; i += 5) {
      const minute = i.toString().padStart(2, '0');
      minuteOptions.innerHTML += `
          <input type="radio" id="minute-${i}" name="minute" value="${i}">
          <label for="minute-${i}">${minute}</label>
      `;
  }

  // Load saved values from localStorage
  const savedHour = localStorage.getItem('selectedHour');
  const savedMinute = localStorage.getItem('selectedMinute');
  if (savedHour !== null) {
      document.getElementById(`hour-${savedHour}`).checked = true;
  }
  if (savedMinute !== null) {
    document.getElementById(`minute-${savedMinute}`).checked = true;
  }

  // Event listeners for hour and minute buttons
  document.querySelectorAll('input[name="hour"]').forEach(input => {
      input.addEventListener('change', () => {
          localStorage.setItem('selectedHour', input.value);
          calculateTimeDifference();
      });
  });

  document.querySelectorAll('input[name="minute"]').forEach(input => {
      input.addEventListener('change', () => {
          localStorage.setItem('selectedMinute', input.value);
          calculateTimeDifference();
      });
  });

  // Calculate time difference
  function calculateTimeDifference() {
      const hour = document.querySelector('input[name="hour"]:checked');
      const minute = document.querySelector('input[name="minute"]:checked');

      if (hour && minute) {
          const selectedHour = parseInt(hour.value);
          const selectedMinute = parseInt(minute.value);

          const now = new Date();
          const target = new Date();
          target.setHours(selectedHour, selectedMinute, 0, 0);

          let differenceInMs = target - now;

          // If the target time is earlier today, set it to tomorrow
          if (differenceInMs < 0) {
              target.setDate(target.getDate() + 1);
              differenceInMs = target - now;
          }

          const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
          const differenceInMinutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));

          document.getElementById('time-output').textContent = `⏰: ${differenceInHours}h ${differenceInMinutes}m`;
      } else {
          document.getElementById('time-output').textContent = '⏰: --:--';
      }
  }

  // Initial calculation if values are already selected
  calculateTimeDifference();
});
