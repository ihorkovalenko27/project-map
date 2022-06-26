import React, { useState } from 'react';
import s from './AddForm.module.css';

const AddForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'description':
        setDescription(value);
        break;

      default:
        return;
    }
  };
  const reset = () => {
    setName('');
    setDescription('');
  };
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(name, description);
    reset();
  };

  return (
    <>
      <div className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <label>
            <span className={s.SearchFormText}>Назва:</span>
            <input
              className={s.SearchForminput}
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>
          <label>
            <span className={s.SearchFormText}>Опис:</span>
            <input
              className={s.SearchForminput}
              type="text"
              name="description"
              value={description}
              onChange={handleInputChange}
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
          </label>
          <button className={s.SearchFormbutton} type="submit">
            Здати в оренду
          </button>
        </form>
      </div>
    </>
  );
};

export default AddForm;
