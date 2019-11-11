import ReactGA from 'react-ga';

// CREDIT: https://medium.com/google-cloud/tracking-site-visits-on-react-app-hosted-in-google-cloud-using-google-analytics-f49c2411d398
function initializeReactGA() {
  const { NODE_ENV } = process.env;
  if (NODE_ENV !== 'development') {
    ReactGA.initialize('UA-54446639-10');
    ReactGA.pageview('/');
  }
}

export default initializeReactGA;
