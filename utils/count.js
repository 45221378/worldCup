export default function count(id) {
  try {
    window._hmt.push(['_trackEvent', id, 'click']);
  } catch (error) {
    console.log(error);
  }
}
