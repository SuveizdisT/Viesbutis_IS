import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const SidebarData = [
    {
        title: 'Hotels',
        path: '/hotels',
        icon: <RiIcons.RiHotelBedFill/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav: [
            {
                title: 'List',
                path: '/hotels/list',
                icon: <IoIcons.IoIosPaper/>
            },
            {
                title: 'Create',
                path: '/hotels/create',
                icon: <IoIcons.IoIosPaper/>
            }
        ]
    }
];

const Nav = styled.div `
    background: black;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const SidebarNav = styled.nav `
    background: black;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({sidebar}) => (sidebar ? '0' : '-100%')};
    transition: 500ms;
    z-index: 10;
`;
const SidebarWrap = styled.div `
    width: 100%;
`;
const SidebarLink = styled(Link) `
    display: flex;
    color: #ele9fc;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    font-size: 30px;
    text-decoration: none;
    &:hover{
        background: #252820;
        border-left: 6px solid #632ce4;
        cursor: pointer; 
    }
`;
const SidebarLabel = styled.span `
    margin-left: 20px;
`;
const DropdownLink = styled(Link) `
    display: flex;
    color: #ele9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    font-size: 25px;
    text-decoration: none;
    &:hover{
        background: #251000;
        border-left: 4px solid #632ce4;
        cursor: pointer; 
}
`;
const SubMenu = ({item}) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav); 
    return (
        <>
            <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>
                        {item.title}
                    </SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav ? item.iconOpened
                    : item.subNav ? item.iconClosed : null}
                </div>
            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {
                return (
                    <DropdownLink to={item.path} key={index}>
                        {item.icon}
                        <SidebarLabel>
                            {item.title}
                        </SidebarLabel>
                    </DropdownLink>
                )
            })}
        </>
    );
};
const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    
  return (
    <>
        <Nav>
            <NavIcon to='#'>
                <FaIcons.FaBars onClick={showSidebar}/>
            </NavIcon>
            <a href="/" className="NavTitle">Viešbutis_IS</a>
            <ul className="NavUl">
                <li>
                    <Link to="/Login">Login</Link>
                </li>
                <li>
                    <Link to="/Register">Sign Up</Link>
                </li>
            </ul>
        </Nav>
        <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
                < NavIcon to='#'>
                    <AiIcons.AiOutlineClose onClick={showSidebar}/>
                </NavIcon>
                {SidebarData.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                })}
            </SidebarWrap>
        </SidebarNav>
    </>
  )
 };

export default Sidebar;