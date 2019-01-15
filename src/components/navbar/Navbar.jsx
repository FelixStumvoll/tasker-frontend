import React, { Component } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeSearchterm } from '../../redux/reducers/searchtermReducer/searchtermActions';
import { logout } from '../../redux/reducers/authReducer/authActions';
import routes from '../../common/routes';
import icon from './notepad.svg';

const Nav = styled.nav`
    height: ${props => props.theme.navHeight};
    background-color: ${props => props.theme.navColor};
    display: grid;
    grid-template-columns: 50px 1fr 50vw 2fr 150px 100px;
    font-family: ${({ theme }) => theme.defaultFont};
    grid-template-areas: 'BackButton . SearchArea . Name Logout';
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 9999;

    @media screen and (max-width: ${({ theme }) => theme.stage1responsive}) {
        grid-template-columns: 50px 1fr 50vw 1fr 50px 10px;
        grid-template-areas: 'BackButton . SearchArea . Logout .';
    }
`;

const Searchbar = styled.input`
    grid-area: SearchArea;
    height: 30px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    padding-left: 5px;
    margin: auto;
    font-family: inherit;
    box-sizing: border-box;
`;

const BackButton = styled(Link)`
    grid-area: BackButton;
    margin: auto;
    font-size: 30px;
    cursor: pointer;
    text-decoration: none;
    color: black;
    background-color: inherit;
`;

const LogoutButton = styled.button`
    grid-area: Logout;
    background-color: ${({ theme }) => theme.negativeColor};
    border: none;
    color: white;
    height: 30px;
    border-radius: 10px;
    margin: auto;
    cursor: pointer;
`;

const UserName = styled.span`
    grid-area: Name;
    font-weight: bolder;
    margin: auto;
    text-overflow: ellipsis;

    @media screen and (max-width: ${({ theme }) => theme.stage1responsive}) {
        display: none;
    }
`;

const Icon = styled.img`
    height: 30px;
    width: 30px;
    margin: auto;
`;

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = { searchterm: props.searchterm };
    }

    onSearchtermChange = e => {
        this.setState({ searchterm: e.target.value });
        this.props.changeSearchterm(e.target.value);
    };

    render() {
        let {
            authenticated,
            username,
            router: {
                location: { pathname }
            }
        } = this.props;
        let { searchterm } = this.state;

        return (
            <Nav>
                <BackButton to={routes.task}>
                    <MediaQuery maxWidth={600}>
                        {matches =>
                            matches && authenticated ? (
                                <FontAwesomeIcon icon={faBars} />
                            ) : (
                                <Icon src={icon} alt="Home" />
                            )
                        }
                    </MediaQuery>
                </BackButton>
                {authenticated && (
                    <>
                        <MediaQuery maxWidth={600}>
                            {matches => {
                                return (
                                    (!matches ||
                                        (matches &&
                                            pathname === routes.task)) && (
                                        <Searchbar
                                            tabIndex="1"
                                            onChange={this.onSearchtermChange}
                                            value={searchterm}
                                            type="text"
                                            placeholder="Search..."
                                        />
                                    )
                                );
                            }}
                        </MediaQuery>
                        <UserName>Hello, {username}</UserName>
                        <LogoutButton onClick={this.props.logout}>
                            Logout
                        </LogoutButton>
                    </>
                )}
            </Nav>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    searchterm: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, searchterm, router }) => ({
    authenticated: auth.authenticated,
    username: auth.username,
    searchterm: searchterm.searchValue,
    router
});

const mapDispatchToProps = {
    logout,
    changeSearchterm
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
