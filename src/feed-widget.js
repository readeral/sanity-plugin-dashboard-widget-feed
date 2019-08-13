import React from 'react';
import PropTypes from 'prop-types';
import FeedItem from './feed-item';
import VideoItem from './video-item';
import styles from './feed-widget.css';
import dataAdapter from './data-adapter';

const {urlBuilder, getFeed} = dataAdapter;

const urlRegEx = /^(?:http:\/\/)?(?:https:\/\/)?(?:www\.)?(?:youtube|facebook|dailymotion|soundcloud|vimeo|wistia|mixcloud|twitch)\.com/gi

export default class FeedWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedItems: []
    }
  }
  
  componentDidMount() {
    getFeed(this.props.queryString, this.props.clientConfig).then(response => {
      this.setState({
        feedItems: response.result
      });
    });
  }

  render() {
    const {title, clientConfig} = this.props;
    const {feedItems} = this.state;

    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title ? title : 'Media Feed'}</h1>
        </header>
        <ul className={styles.grid}>
          {feedItems.map(feedItem => {
            return feedItem.title ? (
              <li key={feedItem._id}>
                {urlRegEx.test(feedItem.externalLink) && !feedItem.videoOptions.noplayer ?
                <VideoItem
                  title={feedItem.title}
                  href={feedItem.externalLink}
                  byline={feedItem.addtext.byline}
                  category={feedItem.category}
                  description={feedItem.addtext.description}
                  id={feedItem._id}
                  videoOptions={feedItem.videoOptions}
                  imageURL={urlBuilder(clientConfig ? clientConfig : '')
                    .image(feedItem.image)
                    .height(360)
                    .url()}
                 /> :
                <FeedItem
                  title={feedItem.title}
                  href={feedItem.externalLink}
                  target={feedItem.target}
                  byline={feedItem.addtext.byline}
                  category={feedItem.category}
                  description={feedItem.addtext.description}
                  videoOptions={feedItem.videoOptions}
                  imageURL={urlBuilder(clientConfig ? clientConfig : '')
                    .image(feedItem.image)
                    .height(360)
                    .url()}
                />
                }
              </li>
            ) : null;
          })}
        </ul>
      </div>
    );
  }
}

FeedWidget.propTypes = {
  title: PropTypes.string.isRequired,
  clientConfig: PropTypes.shape({
    projectId: PropTypes.string,
    dataset: PropTypes.string,
    useCdn: PropTypes.boolean
  }).isRequired,
  queryString: PropTypes.string.isRequired
};

FeedWidget.defaultProps = {
  posterURL: null,
  hasPlayIcon: false,
  category: null,
  description: null
}