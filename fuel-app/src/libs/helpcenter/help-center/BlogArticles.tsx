import { makeStyles, Grid } from '@material-ui/core'
import { InjectHTML, Typography } from '@/shared-ui/components'
import { RightArrowIcon } from '@/shared-ui/react-icons'
import { COMPONENT_WRAPPER } from 'src/constants'
import colors from '@/shared-ui/colors'
import { useAppData } from 'src/hooks'

const BlogArticles = () => {
  const classes = useStyles()
  const blogArticleData = useAppData('blogArticles', true)
  const { title, description, blogs } = blogArticleData
  if (Object.keys(blogArticleData)?.length === 0) {
    return null
  }
  return (
    <div className={classes.root} data-testid="BlogArticles">
      {title?.value && (
        <InjectHTML
          addAnchorStyles
          data-testid="title"
          tagType="h2"
          styleType="h4"
          className={classes.faqTitle}
          value={title?.value}
        />
      )}
      {description?.value && (
        <InjectHTML
          addAnchorStyles
          data-testid="description"
          styleType="p1"
          className={classes.faqTitle}
          value={description?.value}
        />
      )}
      <Grid container spacing={3} className={classes.blogsContainer}>
        {blogs?.list?.map((blog: any, index: number) => {
          return (
            <Grid item xs={12} sm={4} key={`blog-${index}`}>
              <div className={classes.blogCard}>
                <img
                  src={blog?.blogImage?.src}
                  alt={'Blog'}
                  className={classes.blogImage}
                  loading="lazy"
                />
                <div className={classes.blogContent}>
                  <a href={blog?.href?.url} target="_blank" rel="noreferrer">
                    <InjectHTML
                      addAnchorStyles
                      tagType="h3"
                      styleType="h6"
                      data-testid="blogTitle"
                      className={classes.blogTitle}
                      value={blog?.title?.value}
                    />
                  </a>
                  <InjectHTML
                    addAnchorStyles
                    styleType="p1"
                    data-testid="blogDescription"
                    value={blog?.description?.value}
                    className={classes.blogDescription}
                  />
                  <a
                    href={blog?.href?.url}
                    target="_blank"
                    className={classes.rightArrowContainer}
                    rel="noreferrer"
                  >
                    <Typography
                      color="primary"
                      className="readNowDescriptor"
                      styleType="p1"
                    >
                      {blog?.readNowText?.value || 'Read now'}
                    </Typography>
                    <RightArrowIcon className="rightArrowIcon" />
                  </a>
                </div>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints }: { breakpoints: any }) => ({
  root: {
    ...COMPONENT_WRAPPER,
    margin: '60px auto',
  },
  faqTitle: {
    margin: '16px auto',
  },
  blogsContainer: {
    marginTop: 64,
    [breakpoints.down('xs')]: {
      marginTop: 24,
    },
  },
  blogCard: {
    borderRadius: 32,
    '& .readNowDescriptor': {
      opacity: '0',
      transition: `all 0.2s`,
      marginRight: 8,
    },
    '& .rightArrowIcon': {
      '& path': {
        fill: colors.main.midnightExpress,
      },
    },
    '&:hover': {
      '& .readNowDescriptor': {
        opacity: '1',
        display: 'block',
      },
      '& .rightArrowIcon': {
        '& path': {
          fill: colors.main.brightRed,
        },
      },
    },
  },
  blogImage: {
    height: 240,
    width: '100%',
    objectFit: 'cover',
    borderRadius: 16,
  },
  rightArrowContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  blogTitle: {
    marginBottom: 10,
    '&:hover': {
      color: colors.main.brightRed,
    },
  },
  blogContent: {
    padding: 16,
  },
  blogDescription: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}))

export default BlogArticles
