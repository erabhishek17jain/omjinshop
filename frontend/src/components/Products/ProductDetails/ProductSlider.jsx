const ProductSlider = (props) => {
    return (
        <div className="pd u-s-m-b-30">
            <div className="pd-wrap">
                <div id="pd-o-initiate" className="slick-initialized slick-slider">
                    <div className="slick-list draggable">
                        <div className="slick-list draggable">
                            <div className="slick-track" style={{ opacity: 1, width: 2225 }}>
                                {props.images &&
                                    props.images.map((item, index) => (
                                        <div
                                            className="slick-slide slick-current slick-active"
                                            data-slick-index={index}
                                            aria-hidden="false"
                                            style={{ width: 445, position: 'relative', left: 0, top: 0, zIndex: 999, opacity: 1 }}
                                        >
                                            <div>
                                                <div className="pd-o-img-wrap" data-src={item.url} style={{ width: '100%', display: 'inline-block' }}>
                                                    <img className="u-img-fluid" src={item.url} data-zoom-image={item.url} alt={props.name + index} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <span className="pd-text">Click for larger zoom</span>
            </div>
            <div className="u-s-m-t-15">
                <div>
                    <div id="pd-o-thumbnail" className="slick-initialized slick-slider">
                        <div className="pt-prev slick-arrow slick-disabled" aria-disabled="true">
                            <i className="fas fa-angle-left"></i>
                        </div>
                        <div className="slick-list draggable">
                            <div className="slick-track" style={{ opacity: 1, width: 560, transform: 'translate3d(0px, 0px, 0px)' }}>
                                {props.images &&
                                    props.images.map((item, index) => (
                                        <div
                                            className="slick-slide slick-current slick-active"
                                            data-slick-index={index}
                                            aria-hidden="false"
                                            style={{ width: 112 }}
                                        >
                                            <div>
                                                <div style={{ width: '100%', display: 'inline-block' }}>
                                                    <img className="u-img-fluid" src={item.url} alt={props.name + index} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="pt-next slick-arrow" aria-disabled="false">
                            <i className="fas fa-angle-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSlider;
