export const Filter = ({ findContact }) => {
  const handleChange = ({ target }) => {
    findContact(target.value);
  };

  return (
    <div>
      <label>Find contacts by name</label>
      <input type="text" name="filter" onChange={handleChange} />
    </div>
  );
};
