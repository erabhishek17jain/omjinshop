import React, { useState } from 'react';
import { newTags } from '../../../middleware/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

const TagsTab = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const productId = params.id;
    const [tags, setTags] = useState('');

    const tagsSubmitHandler = (e) => {
        e.preventDefault();
        if (tags === '') {
            enqueueSnackbar('Empty Tags', { variant: 'error' });
            return;
        }
        const formData = new FormData();
        formData.set('tags', tags);
        formData.set('productId', productId);
        dispatch(newTags(formData));
    };
    return (
        <div className="tab-pane">
            <div className="pd-tab__tag">
                <h2 className="u-s-m-b-15">ADD YOUR TAGS</h2>
                <div className="u-s-m-b-15">
                    <form>
                        <input className="input-text input-text--primary-style" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                        <button className="btn btn--e-brand-b-2" type="submit" onClick={tagsSubmitHandler}>
                            ADD TAGS
                        </button>
                    </form>
                </div>
                <span className="gl-text">Use comma to separate tags.</span>
            </div>
        </div>
    );
};
export default TagsTab;
