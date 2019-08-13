import nativeClient from 'part:@sanity/base/client';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export default {
  getFeed: (feedQuery, cc) => {
    const query = feedQuery ? feedQuery : `*[ _type == "feedItem"]`
    const uri = `/data/query/${cc.dataset ? cc.dataset : 'production'}?query=${encodeURI(query)}`;
    if (cc.projectId) {
      return sanityClient({
        projectId: cc.projectId,
        dataset: cc.dataset ? cc.dataset : 'production',
        useCdn: (cc.useCdn ? cc.useCdn : true)
      }).request({uri, withCredentials: false});
    }
    return nativeClient.request({uri, withCredentials: false});
  },
  urlBuilder: (cc) => {
    if (cc.projectId) {
      return imageUrlBuilder(
        sanityClient({
          projectId: cc.projectId,
          dataset: cc.dataset ? cc.dataset : 'production',
          useCdn: (cc.useCdn ? cc.useCdn : true)
        })
      )
    }
    return imageUrlBuilder(nativeClient);
  }
};
