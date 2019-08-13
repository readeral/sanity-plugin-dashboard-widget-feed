# Feed Widget for Sanity Dashboard

A dashboard widget based on the [Sanity tutorials widget](https://github.com/sanity-io/sanity/tree/next/packages/%40sanity/dashboard/src/widgets/sanityTutorials) with both React component and schemas included

## Install

- `cd` to your Content Studio
- Type `npm install sanity-plugin-dashboard-widget-feed`:
- The widget will be installed to `./node_modules` in your Studio
- Ensure `dashboard-widget-feed` is appended to the `plugins` array in the `sanity.json` file of your Studio

## How to configure the Feed Widget

In your dashboardConfig.js file ([see here for more about dashboardConfig](https://www.sanity.io/docs/dashboard/installing-and-configuring-widgets)) add the following in the widgets array:

```
    {
      name: 'feed-widget',
      options: {options}
    }
```

Where options is an object containing the configuration for the Feed Widget. A typical options object will look like this:

```
{
  title: 'Media Feed',
  queryString: '*[ _type == "feedItem"]',
  clientConfig: {
    projectId: 'y0urpr0j3ct1d',
    dataset: 'production',
    useCdn: true
  }
}
```

| Field          | Required  | Description                                                                                                                                          | Default value                                                   |
| -------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `title`        | Basically | This is the title displayed on the widget.                                                                                                           | 'Media Feed'                                                    |
| `queryString`  | no        | This is what you're querying the sanity project for. The default (unset) value will query the included schema type of 'feedItem'.                    | \*[ _type == "feedItem"]                                        |
| `clientConfig` | no        | For setting an alternative sanity project or dataset to draw your feed from. _Note: useCdn can only be adjusted along with a projectId and dataset._ | projectId: current project, dataset: 'production', useCdn: true |

## The 'feedItem' schema

Most of the schema should be obvious, however there are a few sneaky features to be across.

### Image:

This is the image for your feed item. If you're rendering a video, then the image will be ignored unless you use the thumbnail option (see below)

### Link:

Link can be to any fully qualified url you like - however if your link is to a video from a number of sources (see below), then the component will automatically render a video player within the feed. In order to control this behaviour, there are a number of 'Video options' at the bottom of the editor:

- _Link out only_ - prevents the default behaviour of loading a video player, and provides a simple link out instead.
- _Load player only after clicking thumbnail_ - stops the video loading until you click. Great for a video-heavy feed. Will create it's own thumbnail, unless you provide an image (see above).
- _Show video player controls_ - should be self evident
- _Enable picture in picture option_ (non-functional/experimental) - **This will be functional in the next release, once Sanity implements React Hooks.** It will render a button in compatible browsers to enable picture in picture mode. Especially great for tutorial videos in which the viewer needs access to their Desk at the same time.
- _Autoplay_ - use with care, as this is set per video! Won't have an effect if you're using the thumbnail option.

#### Video sources which will result in a video player rendering:

- youtube
- facebook
- dailymotion
- soundcloud
- vimeo
- wistia
- mixcloud
- twitch

**These are supplied by [react-player](https://github.com/CookPete/react-player). Playing from file has not been implemented, but will be a future option. If you want to play a video from a different provider, then you'll need to make a pull-request against react-player, and then raise an issue in this library referencing that pull-request.**
