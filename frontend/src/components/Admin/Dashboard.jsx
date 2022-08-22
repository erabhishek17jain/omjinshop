import React from 'react';
import Sidebar from '../Layouts/Sidebar';
import MainData from './MainData';
import { getNavigation } from '../../utils/services';
import { useSelector } from 'react-redux';
const Dashboard = () => {
    const { pathItems } = useSelector((state) => state.path);
    return (
        <>
            {getNavigation(pathItems)}
            <div className='u-s-p-b-60'>
                <div className='section__content'>
                    <div className='dash'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-12'>
                                    <Sidebar activeTab={'adDashboard'} />
                                </div>
                                <div className='col-lg-9 col-md-12'>
                                    <MainData />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
