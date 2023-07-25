import React from 'react';
import Projects from '../../api/project'


const RelatedProject = () => {

    return (        <div className="tp-project-single-item">
            <div className="tp-project-single-title">
                <h3>Related Projects</h3>
            </div>
            <div className="tp-project-area-s2">
                <div className="tp-project-wrap">
                    <div className="row">
                        {Projects.slice(0, 3).map((project, pot) => (
                            <div className="col col-lg-4 col-md-6 col-12" key={pot}>
                                <div className="tp-project-item">
                                    <div className="tp-project-img">
                                        <img src={project.pImg} alt=""/>
                                    </div>
                                    <div className="tp-project-text">
                                        <h2>{project.title}</h2>
                                        <span>{project.subTitle}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default RelatedProject;

