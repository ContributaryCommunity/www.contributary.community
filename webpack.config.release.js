/*
 * Assumes exported AWS environment variables - AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY
 * and per environment AWS_DISTRIBUTION_ID_{STAGE|PROD}
 */

const webpackMerge = require('webpack-merge');
const prodConfig = require('./webpack.config.prod');
const S3Plugin = require('webpack-s3-plugin');
const isProductionRelease = process.env.RELEASE_ENV === 'production';
const bucketPrefix = isProductionRelease ? 'www' : 'stage';
const releaseConfig = {
  bucket: `${bucketPrefix}.contributary.community`,
  cdnBase: isProductionRelease ? '//d2c0ox6hna6x9w.cloudfront.net' : '//d3irvr7ie8o127.cloudfront.net',
  distributionId: isProductionRelease ? process.env.AWS_DISTRIBUTION_ID_PROD : process.env.AWS_DISTRIBUTION_ID_STAGE
};

module.exports = webpackMerge(prodConfig, {

  plugins: [

    new S3Plugin({
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1'
      },
      s3UploadOptions: {
        Bucket: releaseConfig.bucket
      },
      cdnizerOptions: {
        defaultCDNBase: releaseConfig.cdnBase
      },
      cloudfrontInvalidateOptions: {
        DistributionId: releaseConfig.distributionId,
        Items: ['/index.html']
      }
    })

  ]
});