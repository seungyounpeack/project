package kr.go.guri.manager.codeMng.menuMng.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 관리자 > 메뉴 관리 Service클래스
 * @author 김부권
 * @since 2022. 06. 17.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *       수정일			     수정자		               수정내용
 *  --------------    -------------   ----------------------
 *  2022. 06. 17.   	     김부권                        최초 생성
 *   
 * </pre>
 */
public interface MenuMngService {
	
	/**
	 * 메뉴 리스트 조회
	 * @return
	 * @throws SQLException , IOException
	 */
	List<Map<String, Object>> selectMenuList() throws SQLException , IOException;
	
	/**
	 * 메뉴 다음번호 조회
	 * @return
	 * @throws SQLException
	 * @throws IOException
	 */
	List<Map<String, Object>> selectMenuNext(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 메뉴 조회 및 리스트 생성
	 * @return
	 * @throws SQLException
	 * @throws IOException
	 */
	List<Map<String, Object>> selectAuthMenuList(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 메뉴 depth조회
	 * @param param
	 * @return
	 * @throws SQLException
	 * @throws IOException
	 */
	Map<String, Object> selectMenuDp(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 상위 메뉴 등록
	 * @return
	 * @throws SQLException , IOException
	 */
	int insertTopMenuInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 하위 메뉴 등록
	 * @return
	 * @throws SQLException , IOException
	 */
	int insertSubMenuInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 상위 메뉴 수정
	 * @return
	 * @throws SQLException , IOException
	 */
	int updateTopMenuInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 하위 메뉴 수정
	 * @return
	 * @throws SQLException , IOException
	 */
	int updateSubMenuInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 상위 메뉴 삭제
	 * @return
	 * @throws SQLException , IOException
	 */
	int deleteTopMenuInfo(Map<String, Object> param) throws SQLException , IOException;
	
	/**
	 * 하위 메뉴 삭제
	 * @return
	 * @throws SQLException , IOException
	 */
	int deleteSubMenuInfo(Map<String, Object> param) throws SQLException , IOException;
}
