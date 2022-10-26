NEWARTICLE=`hugo new events/$1.md`
GETPATH=${NEWARTICLE% created}

echo ${NEWARTICLE}
/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl ${GETPATH}