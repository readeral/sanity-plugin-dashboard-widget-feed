import React from 'react';
import PropTypes from 'prop-types';
import styles from './feed-item.css';

export default function FeedItem({title, imageURL, target, videoOptions, href, byline, description, category}) {
  return (
    <a className={styles.root} href={href} target={target ? target : "_blank"} rel="noreferrer noopener">
      <div className={styles.posterContainer}>
        <img className={styles.poster} src={imageURL} />
        {videoOptions ? videoOptions.noplayer && (
          <div className={styles.playIcon}>
            <span />
          </div>
        ) : ''}
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

FeedItem.propTypes = {
  title: PropTypes.string.isRequired,
  target: PropTypes.string,
  videoOptions: PropTypes.object,
  imageURL: PropTypes.string,
  href: PropTypes.string.isRequired,
  hasPlayIcon: PropTypes.bool,
  category: PropTypes.string,
  byline: PropTypes.string.isRequired,
  description: PropTypes.string
};

FeedItem.defaultProps = {
  imageURL: null,
  hasPlayIcon: false,
  category: null,
  description: null
}