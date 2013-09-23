<?php

defined('AJXP_EXEC') or die('Access not allowed');

class Islandora extends AJXP_Plugin{

  public function switchAction($action, $httpVars, $fileVars) {

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://philsoga-vagrant-sfu.local/sfu/ajaxplorer/ingest/islandora:root');
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'islandora:root');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $strCookie = session_name() . '=' . $_COOKIE[ session_name() ] . '; path=/';
        $temparray = array();
        foreach($_COOKIE as $key=>$value){
                $temparray[] = $key . "=" . $value;
        }
        $temparray[] = 'path:/';


//      curl_setopt($ch, CURLOPT_COOKIE, 'SESS4cba36cfeb5477e9416882610e6b1c87=dGXogpFWanlGJxNo_-5xAUZ2F3BHyzuiM_vV0annrDY; path:/');
 curl_setopt($ch, CURLOPT_COOKIE, implode('; ', $temparray));

$response = curl_exec($ch);
    curl_close($ch);

include('/usr/share/ajaxplorer/plugins/auth.remote/glueCode.php');
global $AJXP_GLUE_GLOBALS;



    AJXP_XMLWriter::header("url");
    AJXP_XMLWriter::sendMessage("Successfully ingest \n field 1 value: $response \n field 2 value: $strCookie ", null);
    //AJXP_XMLWriter::sendMessage(print_r($_SESSION, true),null);
    file_put_contents('/tmp/my_session_shen', print_r( $_COOKIE, true));
 //AJXP_XMLWriter::reloadDataNode();
echo AuthService::getLogoutAddress(false);
    AJXP_XMLWriter::close("url");

  }
}
