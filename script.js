document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.querySelector('.message-input');
    const messagesContainer = document.querySelector('.messages');
    const contacts = document.querySelectorAll('.contact');
    let currentContact = null;

    // Store messages for each contact
    const messagesByContact = new Map();

    contacts.forEach(contact => {
        contact.addEventListener('click', () => {
            // Save current messages
            if (currentContact) {
                messagesByContact.set(currentContact, messagesContainer.innerHTML);
            }

            // Update current contact
            currentContact = contact.textContent;

            // Clear messages container
            messagesContainer.innerHTML = '';

            // Load saved messages for this contact if they exist
            if (messagesByContact.has(currentContact)) {
                messagesContainer.innerHTML = messagesByContact.get(currentContact);
            }

            // Highlight selected contact
            contacts.forEach(c => c.style.background = '');
            contact.style.background = '#ddd';
        });
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && messageInput.value.trim() !== '' && currentContact) {
            // Create new message element
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'sent');
            messageDiv.textContent = messageInput.value;

            // Add message to container
            messagesContainer.appendChild(messageDiv);

            // Clear input
            messageInput.value = '';

            // Scroll to bottom of messages
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Save updated messages for current contact
            messagesByContact.set(currentContact, messagesContainer.innerHTML);
        }
    });
});
