document.addEventListener('DOMContentLoaded', function() {
  // Sample contacts data
  const contacts = [
      {
          id: 1,
          name: "ARDILIUM",
          avatar: "q.jpg",
          lastMessage: "Hey, how are you doing?",
          time: "10:30 AM"
      },
      {
          id: 2,
          name: "krithi shetty",
          avatar: "kirtry.jpg",
          lastMessage: "Let's meet tomorrow",
          time: "Yesterday"
      },
      {
          id: 3,
          name: "apple",
          avatar: "apple.jpg",
          lastMessage: "The files are ready",
          time: "Yesterday"
      },
      {
          id: 4,
          name: "Nani",
          avatar: "nani.jpg",
          lastMessage: "Thanks for your help!",
          time: "Monday"
      },
      {
          id: 5,
          name: "netflix",
          avatar: "netflix.jpg",
          lastMessage: "Let me check and get back to you",
          time: "Sunday"
      }
  ];

  // DOM elements
  const contactsList = document.querySelector('.contacts-list');
  const searchInput = document.querySelector('.search-box input');

  // Render contacts list
  function renderContacts(filteredContacts = contacts) {
      contactsList.innerHTML = '';
      
      filteredContacts.forEach(contact => {
          const contactElement = document.createElement('div');
          contactElement.className = 'contact';
          contactElement.dataset.id = contact.id;
          
          contactElement.innerHTML = `
              <img src="${contact.avatar}" alt="${contact.name}" class="contact-avatar">
              <div class="contact-info">
                  <h4 class="contact-name">${contact.name}</h4>
                  <p class="contact-last-message">${contact.lastMessage}</p>
                  <p class="contact-time">${contact.time}</p>
              </div>
          `;
          
          // Add click event to each contact
          contactElement.addEventListener('click', function() {
              // Here you can add functionality to open chat with this contact
              console.log(`Opening chat with ${contact.name}`);
          });
          
          contactsList.appendChild(contactElement);
      });
  }

  // Search functionality
  searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const filteredContacts = contacts.filter(contact => 
          contact.name.toLowerCase().includes(searchTerm) || 
          contact.lastMessage.toLowerCase().includes(searchTerm)
      );
      renderContacts(filteredContacts);
  });

  // Initialize
  renderContacts();
});