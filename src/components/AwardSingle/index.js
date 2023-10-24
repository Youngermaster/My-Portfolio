import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Dialog, Grid, } from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import blog3 from '../../images/blog-details/comments-author/img-1.jpg'
import blog4 from '../../images/blog-details/comments-author/img-2.jpg'
import blog5 from '../../images/blog-details/comments-author/img-3.jpg'
import blog6 from '../../images/blog-details/author.jpg'
import gl1 from '../../images/blog-details/1.jpg'
import gl2 from '../../images/blog-details/2.jpg'
import { Description } from '@material-ui/icons';

const submitHandler = (e) => {
  e.preventDefault()
}

const AwardSingle = ({ maxWidth, open, onClose, title, bImg, create_at, author, comment, description }) => {

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (<MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <i className="fa fa-close"></i>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
    );
  });


  return (<Fragment>
    <Dialog
      open={open}
      onClose={onClose}
      className="modalWrapper quickview-dialog"
      maxWidth={maxWidth}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>

      </DialogTitle>
      <Grid className="modalBody modal-body">
        <section className="tp-blog-single-section">
          <div className="container">
            <div className="row">
              <div className='col col-lg-12 col-12'>
                <div className="tp-blog-content">
                  <div className="post format-standard-image">
                    <h2>{title}</h2>
                    <blockquote>
                      {description}
                    </blockquote>
                    <div className="entry-media">
                      <img src={bImg} alt={title} about={title} />
                    </div>
                    <p className='-mt-5'>
                      {create_at}
                    </p>

                    <div className="gallery">
                      <div>
                        <img src={gl1} alt="" />
                      </div>
                      <div>
                        <img src={gl2} alt="" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </Grid>
    </Dialog>
  </Fragment>
  );
}

export default AwardSingle;