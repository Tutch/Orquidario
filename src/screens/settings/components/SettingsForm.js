import React from 'react';
import PropTypes from 'prop-types';

export const SettingsForm = (props) => {
    const themes = props.themeList;
    const setTheme = props.setTheme;
    const currentThemeName = props.currentThemeName;

    return (
        <form className="col s12">
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="col s12">
                            <label htmlFor="theme">Tema</label>
                            <select className="browser-default"
                                    defaultValue={currentThemeName}
                                    name="theme"
                                    onChange={setTheme}>
                                {
                                    themes.map((t, i) => {
                                        return <option key={i} value={t}>{t}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
} 

SettingsForm.propTypes = {
    themeList: PropTypes.array,
    currentThemeName: PropTypes.string,
    setTheme: PropTypes.func
}
