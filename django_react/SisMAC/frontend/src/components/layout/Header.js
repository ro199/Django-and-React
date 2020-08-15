import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

export class Header extends Component{
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <form className="form-inline my-2 my-lg-0">
                <span className="navbar-text mr-3"><strong>{user ? `Bienvenido ${user.username}`:""}</strong></span>
                <button onClick={this.props.logout} className="btn btn-info">LogOut</button>
            </form>
        );

        const guestLinks = (
            <form className="form-inline my-2 my-lg-0">
                <Link to="/register" className="btn btn-outline-success">Sing Up</Link>
                <Link to="/login" className="btn btn-outline-success mr-sm-2 ml-2">Log In</Link>
            </form>
        );

        return (
            <nav className="navbar navbar-expand-sm bg-light">
                <div className="container">
                    <a href="#" className="navbar-brand mr-auto"></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="Navbar">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-ietm"><a href="#" className="nav-link">Vista Global</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Ingreso deS datos</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Consultas</a></li>
                        </ul>
                        { isAuthenticated ? authLinks  : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, {logout} )(Header); 