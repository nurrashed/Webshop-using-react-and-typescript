import React from 'react';
import {Menu, Container} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default function Header(){
    return(
        <Menu inverted>
            <Container>
                <Link to='/'>
                    <Menu.Item name="Home" />
                </Link>
                <Link to='/Admin'>
                    <Menu.Item name="admin" />
                </Link>
                <Link to='/cart'>
                    <Menu.Item name="cart" />
                </Link>
            </Container>
        </Menu>
    )
}