import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  changeFilter,
  deleteContact,
  selectContacts,
  selectFilter,
} from '../redux/contactFormReducer';

export const App = () => {
  const contacts = useSelector(selectContacts) || [];
  const filter = useSelector(selectFilter) || '';

  const dispatch = useDispatch();

  const addNewContact = data => {
    // const isDuplicate = phonebook.contacts.some(
    //   contact => contact.name.toLowerCase() === data.name.toLowerCase()
    // );

    // if (isDuplicate) {
    //   alert(`${data.name} is already in contacts`);
    //   return;
    // }

    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    const newContact = { ...data, id: nanoid() };
    //   setPhonebook(prevState => ({
    //     ...prevState,
    //     contacts: [...prevState.contacts, newContact],
    //   }));
    // };

    dispatch(addContact(newContact));
  };

  const findContact = contactName => {
    // setPhonebook(prevState => ({
    //   ...prevState,
    //   filter: contactName.toLowerCase(),
    // }));
    dispatch(changeFilter(contactName.toLowerCase()));
  };

  const handleDelete = id => {
    // setPhonebook(prevState => ({
    //   ...prevState,
    //   contacts: prevState.contacts.filter(contact => contact.id !== id),
    // }));
    dispatch(deleteContact(id));
  };

  // useEffect(() => {
  //   const savedContacts = localStorage.getItem('contacts');
  //   if (savedContacts) {
  //     setPhonebook({ contacts: JSON.parse(savedContacts), filter: '' });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (phonebook.contacts.length > 0) {
  //     localStorage.setItem('contacts', JSON.stringify(phonebook.contacts));
  //   } else {
  //     localStorage.removeItem('contacts');
  //   }
  // }, [phonebook.contacts]);

  // const filteredContacts = phonebook.contacts.filter(contact =>
  //   contact.name?.toLowerCase().includes(phonebook.filter || '')
  // );

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(filter?.toLowerCase() || '')
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addNewContact={addNewContact} />

      <h2>Contacts</h2>
      <Filter findContact={findContact} />
      <ContactList contacts={filteredContacts} handleDelete={handleDelete} />
    </div>
  );
};
