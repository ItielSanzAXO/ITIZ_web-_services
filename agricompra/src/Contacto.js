import React from 'react';
import './Contacto.css'; // Asegúrate de crear este archivo CSS para los estilos

const Contacto = () => {
    return (
        <div className="contacto-container">
            <div className="contacto-info-container">
                <div className="contacto-details">
                    <h2 className="contacto-titulo">Contacto</h2>
                    <p className="contacto-info">
                        <strong>Número de contacto:</strong> 
                        <a href="tel:+5615965038" className="contacto-link"> +56 1596 5038</a>
                    </p>
                    <p className="contacto-info">
                        <strong>Correo de la empresa:</strong> 
                        <a href="mailto:agricompra@contacto.com" className="contacto-link"> agricompra@contacto.com</a>
                    </p>
                </div>
                <div className="logo-container">
                    <img src="/img/logo_letras.jpeg" alt="Logo" className="logo-image" />
                    
                </div>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6439.527370430567!2d-99.05549249005908!3d19.380319842274567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fd0614558e4b%3A0x3760847a107a0b9f!2sTecNM%20%7C%20Tecnol%C3%B3gico%20Nacional%20de%20M%C3%A9xico%20Campus%20Iztapalapa!5e1!3m2!1ses-419!2sus!4v1733202327813!5m2!1ses-419!2sus"
                        width="300"
                        height="225"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
