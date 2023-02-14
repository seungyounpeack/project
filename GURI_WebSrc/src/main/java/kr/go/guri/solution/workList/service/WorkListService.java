package kr.go.guri.solution.workList.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 관리자 > 솔루션 워크플로워 리스트 Service 클래스
* @author 권기완
* @since 2022. 10. 26.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*  수정일			수정자			수정내용
*  -------    		-------------   ----------------------
*  2022.10.26.   	권기완          최초 생성
*   
* </pre>
*/
public interface WorkListService {

	List<Map<String, Object>> selectWorkList(Map<String, Object> param) throws SQLException , IOException;

	List<Map<String, Object>> selectCategory() throws SQLException , IOException;

}
