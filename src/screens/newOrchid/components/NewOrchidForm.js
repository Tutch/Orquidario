import React from 'react';
import PropTypes from 'prop-types';

export const NewOrchidForm = (props) => {
    const families = props.subfamilies;
    const setSubfamily = props.setSubfamily;
    const saveOrchid = props.saveOrchid;
    const setDescription = props.setDescription;

    return (
        <form onSubmit={saveOrchid}>
            <div>
                <label htmlFor="description">Descrição</label>
                <input placeholder="Descrição breve da orquídea"
                       onChange={setDescription} 
                       name="description"
                       maxLength={50} 
                       type="text"/>
            </div>
            <div>
                <label htmlFor="subfamily">Subfamília</label>
                <select name="subfamily" onChange={setSubfamily}>
                    {
                        families.map((family, i) => {
                            return <option key={i} value={family}>{family}</option>
                       })
                    }
                </select>
            </div>
            <input type="submit" value="Salvar"/>
        </form>
    );
}

NewOrchidForm.propTypes = {
    subfamilies: PropTypes.array,
    saveOrchid: PropTypes.func,
    setDescription: PropTypes.func,
    setSubfamily: PropTypes.func
};
