import React from 'react';
import PropTypes from 'prop-types';
import Config from '../../../config';

export const NewOrchidForm = (props) => {
    const families = props.subfamilies;
    const setSubfamily = props.setSubfamily;
    const saveOrchid = props.saveOrchid;
    const setDescription = props.setDescription;

    return (
        <form onSubmit={saveOrchid}>
            <div className="input-field">
                <label htmlFor="description" className="active">Descrição</label>
                <input placeholder="Descrição breve da orquídea"
                       onChange={setDescription} 
                       name="description"
                       maxLength={50} 
                       type="text"/>
            </div>
            <div>
                <label htmlFor="subfamily">Subfamília</label>
                <select className="browser-default" name="subfamily" onChange={setSubfamily}>
                    {
                        families.map((family, i) => {
                            return <option key={i} value={family}>{family}</option>
                       })
                    }
                </select>
            </div>

            <button className={'btn waves-effect waves-light '+ Config.mainColor} 
                    type="submit" 
                    name="action">
                Salvar
                <i className="material-icons right">save</i>
            </button>                  
        </form>
    );
}  

NewOrchidForm.propTypes = {
    subfamilies: PropTypes.array,
    saveOrchid: PropTypes.func,
    setDescription: PropTypes.func,
    setSubfamily: PropTypes.func
};
