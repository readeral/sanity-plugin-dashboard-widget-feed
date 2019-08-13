export default {
    name: 'feedItem',
    title: 'Dashboard Feed Items',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'addtext',
        title: 'Additional Text',
        type: 'object',
        description: 'The byline field is mutually exclusive to the presenter field below. If a presenter is set, no value for byline will be displayed.',
        fields: [
          {name: 'byline', type: 'string', title: 'Byline'},
          {name: 'description', type: 'string', title: 'Description'}
        ]
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string'
      },
      {
        name: 'presenter',
        title: 'Presenter',
        type: 'reference',
        to: [{
          type: 'presenter'
        }]
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image'
      },
      {
        name: 'externalLink',
        title: 'Link',
        type: 'url',
        validation: Rule => Rule.regex(/^(?:http:\/\/)?(?:https:\/\/)?(?:www\.)?(?:youtube|facebook|dailymotion|soundcloud|vimeo|wistia|mixcloud|twitch)\.com/gi).warning('This URL will render a video player in the feed. Please review the options below.')
      },
      {
        name: 'target',
        title: 'URL target',
        type: 'string',
        options: {
          list: [
            {title: 'New tab', value: '_blank'},
            {title: 'Current tab', value: '_current'}
          ],
          layout: 'radio',
          direction: 'horizontal'
        }
      },
      {
        name: 'videoOptions',
        title: 'Video options',
        type: 'object',
        fields: [{
          name: 'noplayer',
          title: 'Link out only (Prevent video loading within the feed)',
          type: 'boolean'
        },
          {
          name: 'light',
          title: 'Load player only after clicking on thumbnail (good for feeds with lots of videos. Uses either the video thumbnail, or your own image.)',
          type: 'boolean'
        },{
          name: 'controls',
          title: 'Show video player controls',
          type: 'boolean'
        },{
          name: 'pip',
          title: 'Enable picture-in-picture option',
          type: 'boolean'
        },{
          name: 'playing',
          title: 'Autoplay',
          type: 'boolean'
        },]
      }
    ]
  };
  