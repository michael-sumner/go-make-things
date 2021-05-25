YEAR=`date +"%Y"`
TODAY=`date +"%Y-%m-%d"`

NEWARTICLE=`hugo new articles/${YEAR}/${TODAY}-$1.md`
GETPATH=${NEWARTICLE}

/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl ${GETPATH}