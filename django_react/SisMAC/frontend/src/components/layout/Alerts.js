import React, {Component, Fragment} from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps){
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.code) alert.error(`Codigo: ${error.msg.code.join()}`);
            if (error.msg.description) alert.error(`Descripcion: ${error.msg.description.join()}`);
            if (error.msg.purchase_date) alert.error(`Fecha de compra: ${error.msg.purchase_date.join()}`);
            if (error.msg.purchase_value) alert.error(`Valor de compra: ${error.msg.purchase_value.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join());
            if (error.msg.first_name) alert.error(`Nombre: ${error.msg.first_name.join()}`);
            if (error.msg.last_name) alert.error(`Apellido: ${error.msg.last_name.join()}`);
            if (error.msg.photo) alert.error(`Archivo: ${error.msg.photo.join()}`);
            if (error.msg.name_brand) alert.error(`Nombre de la Marca: ${error.msg.name_brand.join()}`);
            if (error.msg.name_type) alert.error(`Nombre de la Categoria: ${error.msg.name_type.join()}`);
            if (error.msg.name_class) alert.error(`Nombre de la Sub-Categoria: ${error.msg.name_class.join()}`);
            if (error.msg.unit_quantity) alert.error(`Cantidad: ${error.msg.unit_quantity.join()}`);
            if (error.msg.unit_price) alert.error(`Precio Unitario: ${error.msg.unit_price.join()}`);
            if (error.msg.asset_type) alert.error('Seleccione una Categoria');
            if (error.msg.name_resource) alert.error(`Nombre del Archivo: ${error.msg.name_resource.join()}`);
            if (error.msg.author) alert.error(`Autor: ${error.msg.name_resource.join()}`);
            if (error.msg.asset) alert.error('Seleccione un Activo');

        }

        if (message !== prevProps.message) {
            if (message.deleteAsset) alert.success(message.deleteAsset);
            if (message.addAsset) alert.success(message.addAsset);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
            if (message.addProfile) alert.success(message.addProfile);
            if (message.deleteType) alert.success(message.deleteType);
            if (message.deleteBrands) alert.success(message.deleteBrands);
            if (message.addBrands) alert.success(message.addBrands);
            if (message.addType) alert.success(message.addType);
            if (message.deleteType) alert.success(message.deleteType);
            if (message.addClass) alert.success(message.addClass);
            if (message.deleteClass) alert.success(message.deleteClass);
            if (message.deleteResource) alert.success(message.deleteResource);
            if (message.addResource) alert.success(message.addResource);
        }
    }

    render(){
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));