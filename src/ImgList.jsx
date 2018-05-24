import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { CircularProgress } from 'material-ui';

const styles = {
  gridList: {
    margin: '30px'
  }
};

class ImgList extends Component {
  render() {
    const { imgs, loaded } = this.props;
    return loaded ? (
      <GridList cols={4} cellHeight={'auto'} style={styles.gridList}>
        {imgs.map((img, id) => {
          return (
            <GridTile key={id} title={img.id} titleBackground={'rgba(0, 0, 0, 0.1)'}>
              <img src={`data:image/png;base64, ${img.img}`} alt="" />
            </GridTile>
          );
        })}
      </GridList>
    ) : (
      <CircularProgress
        size={150}
        thickness={10}
        style={{ display: 'block', marginLeft: 130, marginTop: 50, alignSelf: 'center' }}
      />
    );
  }
}

export default ImgList;
