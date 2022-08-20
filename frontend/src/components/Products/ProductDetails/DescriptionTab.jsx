const DescriptionTab = (props) => {
    return (
        <div className="tab-pane">
            <div className="pd-tab__desc">
                <div className="u-s-m-b-15">
                    <p>{props.product.description}</p>
                </div>
                <div className="u-s-m-b-30">
                    <div className="fluid-width-video-wrapper">
                        <iframe src="https://www.youtube.com/embed/qKqSBm07KZk" allowfullscreen="" name="fitvid0"></iframe>
                    </div>
                </div>
                <div className="u-s-m-b-15">
                    <h4>SPECIFICATIONS</h4>
                </div>
                <div className="u-s-m-b-15">
                    <div className="pd-table gl-scroll">
                        <table>
                            <tbody>
                                {props.product.specifications?.map((spec, i) => (
                                    <tr key={i}>
                                        <td>{spec.title}</td>
                                        <td>{spec.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="u-s-m-b-30">
                    <ul>
                        <li>
                            <i className="fas fa-check u-s-m-r-8"></i>
                            <span>Buyer Protection.</span>
                        </li>
                        <li>
                            <i className="fas fa-check u-s-m-r-8"></i>
                            <span>Full Refund if you don't receive your order.</span>
                        </li>
                        <li>
                            <i className="fas fa-check u-s-m-r-8"></i>
                            <span>Returns accepted if props.product not as described.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default DescriptionTab;
