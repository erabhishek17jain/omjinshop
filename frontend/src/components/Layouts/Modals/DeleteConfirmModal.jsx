import { Link } from 'react-router-dom';

const DeleteConfirmModal = (props) => {
    return (
        <>
            <div className='modal fade show' style={{ display: 'block' }} id='add-to-cart'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content modal-radius modal-shadow'>
                        <button className='btn dismiss-button fas fa-times' type='button' onClick={() => props.closeModal()}></button>
                        <div className='modal-body'>
                            <div className='col-lg-12 col-md-12 u-s-m-b-16 u-s-m-t-16'>
                                <div className='u-s-m-b-16'>
                                    <div className='success__text-wrap'>
                                        <span>Are you sure?</span>
                                    </div>
                                    <span className='s-option__text'>
                                        Do you really want to delete{props.name && <span className='font-medium'>&nbsp;{props.name}</span>}? This process cannot
                                        be undone.
                                    </span>
                                </div>
                                <div className='u-s-m-b-16 u-s-m-t-4' style={{ display: 'flex', justifyContent: 'end' }}>
                                    <a href='#' onClick={() => props.closeModal()} className='modal-btn btn--e-transparent-brand-b-2'>
                                        CANCEL
                                    </a>
                                    <a href='#' onClick={() => props.deleteHandler(props.id)} className='modal-btn btn--e-brand-b-2 u-s-m-l-16'>
                                        DELETE
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-backdrop fade show'></div>
        </>
    );
};

export default DeleteConfirmModal;
