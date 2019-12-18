import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import carouselStyles from '../styles/carouselStyles'

function Banner ({ classes, length, item }) {
  const totalItems = length || 3
  const items = []

  for (let i = 0; i < totalItems; i++) {
    const media = (
      <Grid item xs={12 / totalItems} key={item.Name}>
        {/* <Link href={`/item/${item.Id}`} className="Link"> */}
        <CardMedia
          className={classes.media}
          image={item.Image}
          title={item.Name}
          classes={{
            image: classes.image
          }}
        >
          <Typography className={classes.mediaCaption}>{item.Name}</Typography>
        </CardMedia>
        {/* </Link> */}
      </Grid>
    )
    items.push(media)
  }
  return (
    <Card raised className={classes.banner}>
      <Grid container spacing={0} className={classes.bannerGrid}>
        {items}
      </Grid>
    </Card>
  )
}

const HomeCarousel = ({ items }) => {
  const classes = carouselStyles()
  return (
    <div className={classes.root}>
      <Carousel
        autoPlay={false}
        timer={500}
        animation='slide'
        indicators
        className={classes.carousel}
      >
        {items.map((item, index) => {
          return <Banner item={item} key={index} classes={classes} length={1} />
        })}
      </Carousel>
    </div>
  )
}

export default HomeCarousel
