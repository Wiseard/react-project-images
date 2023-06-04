import axios from 'axios'
const url = 'https://api.unsplash.com'
const unsplashFetch = axios.create({
  baseURL: url,
})

export default unsplashFetch

// const url2 =
//   'https://api.unsplash.com/search/photos?client_id=QUR5rj63MPjzHGavgB5HyE463kGNyRTG-NHdmJLnIYo'
