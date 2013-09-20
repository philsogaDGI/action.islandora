<?php

defined('AJXP_EXEC') or die('Access not allowed');

class Islandora extends AJXP_Plugin{

  public function switchAction($action, $httpVars, $fileVars) {
    
    $f1 = $httpVars["field1"];
    $f2 = $httpVars["field2"];
    AJXP_XMLWriter::header();
    AJXP_XMLWriter::sendMessage("Successfully ingest \n field 1 value: $f1 \n field 2 value: $f2", null);
   
    //AJXP_XMLWriter::reloadDataNode();
    AJXP_XMLWriter::close();

  }
}