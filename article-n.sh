YEAR=`date +"%Y"`
TOMORROW=`date -v+$2d +"%Y-%m-%d"`

NEWARTICLE=`hugo new articles/${YEAR}/${TOMORROW}-$1.md`
GETPATH=${NEWARTICLE% created}

echo ${NEWARTICLE}
/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl ${GETPATH}