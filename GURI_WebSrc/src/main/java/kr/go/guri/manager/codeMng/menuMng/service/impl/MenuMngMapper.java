package kr.go.guri.manager.codeMng.menuMng.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

/**
 * 관리자 > 메뉴 관리 Mapper 클래스
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

@Repository("menuMngMapper")
public class MenuMngMapper  extends ComAbstractDAO {
	
	
	/**
	 * 메뉴 리스트 조회
	 * @return
	 * @throws SQLException , IOException
	 */
	public List<Map<String, Object>> selectMenuList() throws SQLException , IOException{
		return selectList("MenuMng.selectMenuList");
	}
	
	/**
	 * 메뉴 다음코드 조회
	 * @return
	 * @throws SQLException , IOException
	 */
	public List<Map<String, Object>> selectMenuNext(Map<String, Object> param) throws SQLException , IOException{
		return selectList("MenuMng.selectMenuNext", param);
	}
	
	/**
	 * 메뉴 리스트 조회 및 메뉴생성
	 * @return
	 * @throws SQLException , IOException
	 */
	public List<Map<String, Object>> selectAuthMenuList(Map<String, Object> param) throws SQLException , IOException{
		return selectList("MenuMng.selectAuthMenuList", param);
	}
	
	/**
	 * 메뉴 다음코드 조회
	 * @return
	 * @throws SQLException , IOException
	 */
	public Map<String, Object> selectMenuDp(Map<String, Object> param) throws SQLException , IOException{
		return selectOne("MenuMng.selectMenuDp", param);
	}
	
	/**
	 * 상위 메뉴 등록
	 * @return
	 * @throws SQLException , IOException
	 */
	public int insertTopMenuInfo(Map<String, Object> param) throws SQLException , IOException{
		return insert("MenuMng.insertTopMenuInfo", param);
	}
	
	/**
	 * 하위 메뉴 등록
	 * @return
	 * @throws SQLException , IOException
	 */
	public int insertSubMenuInfo(Map<String, Object> param) throws SQLException , IOException{
		return insert("MenuMng.insertSubMenuInfo", param);
	}
	
	/**
	 * 상위 메뉴 업데이트
	 * @return
	 * @throws SQLException , IOException
	 */
	public int updateTopMenuInfo(Map<String, Object> param) throws SQLException , IOException{
		return update("MenuMng.updateTopMenuInfo", param);
	}
	
	/**
	 * 하위 메뉴 업데이트
	 * @return
	 * @throws SQLException , IOException
	 */
	public int updateSubMenuInfo(Map<String, Object> param) throws SQLException , IOException{
		return update("MenuMng.insertSubMenuInfo", param);
	}
	
	/**
	 * 상위 메뉴 삭제
	 * @return
	 * @throws SQLException , IOException
	 */
	public int deleteTopMenuInfo(Map<String, Object> param) throws SQLException , IOException{
		return delete("MenuMng.deleteTopMenuInfo", param);
	}
	
	/**
	 * 하위 메뉴 삭제
	 * @return
	 * @throws SQLException , IOException
	 */
	public int deleteSubMenuInfo(Map<String, Object> param) throws SQLException , IOException{
		return delete("MenuMng.deleteSubMenuInfo", param);
	}
}
