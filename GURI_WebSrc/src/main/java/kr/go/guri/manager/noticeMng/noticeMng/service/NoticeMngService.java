package kr.go.guri.manager.noticeMng.noticeMng.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;
/**
 * 관리자 > 공지사항 Service 클래스
* @author 권기완
* @since 2022. 06. 25.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*  수정일			수정자			수정내용
*  -------    		-------------   ----------------------
*  2022.06.25.   	권기완          최초 생성
*   
* </pre>
*/
public interface NoticeMngService {

	/**
	 * 공지사항 리스트 조회하기
	 * @param param
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectNoticeList(Map<String, Object> param) throws SQLException , IOException;

	int deleteNoticeList(EgovMap map) throws SQLException , IOException;

	int deleteNoticeListFile(EgovMap map) throws SQLException , IOException;

}
