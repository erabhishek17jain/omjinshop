const CategoryHerirarcy = (props) => {
    return (
        props.catgories &&
        props.catgories.map((item, i) => (
            <li className="has-separator">
                <a href="#">{item}</a>
            </li>
        ))
    );
};
export default CategoryHerirarcy;
