import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
    // bring the location from the router into the component
    const location = useLocation();

    return (
        <Menu inverted fixed='top'>
            <Container>
                {/* USEFUL */}
                <Menu.Item as={NavLink} className={location.pathname === '/' ? 'active' : '' }  to='/' end header>
                    <img
                        src='/assets/logo.png'
                        alt='logo'
                        style={{ marginRight: '10px' }}
                    />
                    Reactivities
                </Menu.Item>
                <Menu.Item
                    name='Activities'
                    as={NavLink}
                    to='/activities'
                    className={location.pathname === '/activities' ? 'active' : '' }
                    end
                    header
                />
                <Menu.Item
                    name='Errors'
                    as={NavLink}
                    to='/tests/errors'
                    className={location.pathname === '/tests/errors' ? 'active' : '' }
                    end
                    header
                />
                <Menu.Item>
                    <Button
                        as={NavLink}
                        to='/activities/create'
                        positive
                        className={location.pathname === '/activities/create' ? 'active' : '' }
                        content='Create Activity'
                    />
                </Menu.Item>
            </Container>
        </Menu>
    );
}
