import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [phonebook, setPhonebook] = useState({ contacts: [], filter: '' });

  const addContact = data => {
    const isDuplicate = phonebook.contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    const newContact = { ...data, id: nanoid() };
    setPhonebook(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, newContact],
    }));
  };

  const findContact = contactName => {
    setPhonebook(prevState => ({
      ...prevState,
      filter: contactName.toLowerCase(),
    }));
  };

  const handleDelete = id => {
    setPhonebook(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setPhonebook({ contacts: JSON.parse(savedContacts), filter: '' });
    }
  }, []);

  useEffect(() => {
    if (phonebook.contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(phonebook.contacts));
    } else {
      localStorage.removeItem('contacts');
    }
  }, [phonebook.contacts]);

  const filteredContacts = phonebook.contacts.filter(contact =>
    contact.name?.toLowerCase().includes(phonebook.filter || '')
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter findContact={findContact} />
      <ContactList contacts={filteredContacts} handleDelete={handleDelete} />
    </>
  );
};
