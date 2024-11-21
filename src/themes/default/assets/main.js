document.addEventListener('DOMContentLoaded', () => {
  // Add date validation for booking forms
  const bookingForms = document.querySelectorAll('.booking-form');
  bookingForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const bookingData = Object.fromEntries(formData);
      
      try {
        const response = await fetch('/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        });
        
        if (!response.ok) {
          throw new Error('Booking failed');
        }
        
        const result = await response.json();
        alert('Booking successful!');
        form.reset();
      } catch (error) {
        alert('Error creating booking: ' + error.message);
      }
    });
  });
});