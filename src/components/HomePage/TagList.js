import React from 'react';
import config from '../../helpers/config';

const TagList = props => {
    const tags = props.tags;
    if (tags) {
        return (
            <div className="tag-list">
                {
                    tags.map(tag => {
                        const handleClick = ev => {
                            ev.preventDefault();
                            props.onClickTag(tag, page => config.Articles.byTag(tag, page), config.Articles.byTag(tag));
                        };

                        return (
                            <a
                                href=""
                                className="tag-default tag-pill"
                                key={tag}
                                onClick={handleClick}>
                                {tag}
                            </a>
                        );
                    })
                }
            </div>
        );
    } else {
        return (
            <div>Loading Tags...</div>
        );
    }
};

export default TagList;
