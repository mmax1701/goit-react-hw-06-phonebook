import { useState } from 'react';

export const ContactForm = ({ addContact }) => {
  const [contact, setContact] = useState({
    name: '',
    number: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({
      name: contact.name,
      number: contact.number,
    });

    setContact({
      name: '',
      number: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+((['\- ][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces."
        required
        onChange={handleChange}
        value={contact.name}
      />

      <label>Number</label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, and parentheses."
        required
        onChange={handleChange}
        value={contact.number}
      />

      <button type="submit">Add contact</button>
    </form>
  );
};
