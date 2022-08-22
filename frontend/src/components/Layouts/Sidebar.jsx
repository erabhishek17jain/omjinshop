import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { signOutUser } from '../../middleware/actions/userAction';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import { setPath } from '../../middleware/actions/pathAction';
import { adminSideBarUrl, userSideBarUrl } from '../../utils/constants';

const Sidebar = ({ activeTab }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);
    const { pathItems } = useSelector((state) => state.path);

    const handleSignout = () => {
        dispatch(signOutUser());
        enqueueSnackbar('Signout Successfully', { variant: 'success' });
        navigate('/signIn');
    };

    const redirectTo = (e, path, i) => {
        e.preventDefault();
        let newPath = pathItems;
        if (newPath.length === i) {
            newPath[newPath.length - 1] = path;
        } else if (newPath.length < i) {
            newPath.pop();
            if (path.path.indexOf('order') !== -1) {
                newPath.push({ title: 'Orders', path: '/account/orders', tab: 'adOrders' });
            } else if (path.path.indexOf('profile') !== -1) {
                newPath.push({ title: 'Profile', path: '/account/profile', tab: 'profile' });
            } else if (path.path.indexOf('addressBook') !== -1) {
                newPath.push({ title: 'Address Book', path: '/account/addressBook', tab: 'adReviews' });
            }
            newPath.push(path);
        } else if (newPath.length > i) {
            newPath.splice(i, newPath.length - 1);
            newPath[newPath.length - 1] = path;
        }
        dispatch(setPath(newPath)).then(() => {
            navigate(path.path);
        });
    };

    const menuBar = user.role === 'admin' ? adminSideBarUrl : userSideBarUrl;

    return (
        <>
            <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                <div className="dash__pad-1">
                    <div className="description__container u-s-m-b-16">
                        <Avatar alt="Avatar" src={user.avatar.url} sx={{ width: 50, height: 50 }} />
                        <span className="gl-label u-s-m-l-16 u-s-m-b-16">Hello, {user.name}</span>
                    </div>
                    <ul className="dash__f-list">
                        {menuBar.map((item) => {
                            const { title, path } = item;
                            return (
                                <li>
                                    <a
                                        href="#"
                                        onClick={(e) => redirectTo(e, item, path.split('/').length - 1)}
                                        className={activeTab === path ? 'dash-active' : ''}
                                    >
                                        {title}
                                    </a>
                                </li>
                            );
                        })}
                        <li>
                            <a onClick={handleSignout}>Signout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
