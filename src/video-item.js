import React from 'react';
import PropTypes from 'prop-types';
import styles from './feed-item.css';
import ReactPlayer from 'react-player'

export default function VideoItem({title, id, imageURL, href, byline, description, category, videoOptions}) {
  
  const thumbnail = imageURL ? imageURL : true

  return (
    <a className={styles.root}>
      <div className={styles.posterContainer}>
        <ReactPlayer
          className={styles.reactPlayer}
          url={href}
          width="100%"
          height="100%"
          playsinline
          controls={videoOptions.controls}
          pip={videoOptions.pip}
          playing={videoOptions.playing}
          light={videoOptions.light ? thumbnail : ''}
          />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.textwrapper}>
        <div className={styles.byline}>{byline}</div>
        <div className={styles.description}>
          {category && description
            ? `${category} - ${description}`
            : category
            ? {category}
            : description
            ? {description}
            : ''}
        </div>
      </div>
    </a>
  );
}

VideoItem.propTypes = {
  title: PropTypes.string.isRequired,
  posterURL: PropTypes.string,
  videoOptions: PropTypes.shape({
    controls: PropTypes.bool,
    pip: PropTypes.bool,
    playing: PropTypes.bool,
    light: PropTypes.bool
  }),
  href: PropTypes.string.isRequired,
  category: PropTypes.string,
  byline: PropTypes.string.isRequired,
  description: PropTypes.string
};

VideoItem.defaultProps = {
  posterURL: null,
  category: null,
  description: null
}