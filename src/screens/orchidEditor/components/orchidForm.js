import React from 'react';
import PropTypes from 'prop-types';
import Config from '../../../common/config';

const path = window.require('path');

export const OrchidForm = (props) => {
    const families = props.subfamilies;
    const setSubfamily = props.setSubfamily;
    const saveOrchid = props.saveOrchid;
    const setDescription = props.setDescription;
    const selectPictures = props.selectPictures;
    const removePicture = props.removePicture;
    
    let files = props.files.map(f => {
        let fname = path.basename(f);
        let display = fname.length > 30 
                        ? `${f.substring(0, 27)}...` 
                        : fname;
        let file_obj = { 
            path: f, 
            display: display
        }

        return file_obj;
    });

    return (
        <form className="col s12" onSubmit={saveOrchid}>
            <div className="row">
                <div className="col s6">
                    <div className="row">
                        <div className="input-field col s12">
                            <label htmlFor="description" className="active">Descrição</label>
                            <input placeholder="Descrição breve da orquídea"
                                onChange={setDescription} 
                                name="description"
                                maxLength={50}
                                type="text"
                                defaultValue={props.formFields.description}
                                required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <label htmlFor="subfamily">Subfamília</label>
                            <select className="browser-default" 
                                    defaultValue={props.formFields.subfamily}
                                    name="subfamily" 
                                    onChange={setSubfamily}>
                                {
                                    families.map((family, i) => {
                                        return <option key={i} value={family}>{family}</option>
                                })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className={'btn right waves-effect waves-light '+ Config.mainColor} 
                                    type="submit" 
                                    name="action">
                                Salvar
                                <i className="material-icons right">save</i>
                            </button>
                            <button className={'btn left waves-effect waves-light '+ Config.mainColor} 
                                    onClick={selectPictures} >
                                Inserir fotos
                                <i className="material-icons right">attachment</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col s6">
                    <label>Fotografias</label>
                    <ul className="collection with-header">
                        {
                            files.map((file) => {
                                return (
                                    <li key={file.path} className="collection-item">
                                        <div>
                                            {file.display}
                                            <a href="#!" 
                                               onClick={
                                                   (e) => removePicture(file, e)
                                                }
                                               className={'secondary-content ' + Config.mainColorText}>
                                                <i className="material-icons">clear</i>
                                            </a>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>                  
        </form>
    );
}  

OrchidForm.propTypes = {
    subfamilies: PropTypes.array,
    saveOrchid: PropTypes.func,
    setDescription: PropTypes.func,
    setSubfamily: PropTypes.func
};